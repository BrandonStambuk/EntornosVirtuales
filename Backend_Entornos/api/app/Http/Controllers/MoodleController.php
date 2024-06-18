<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\OAuth2\Client\Provider\GenericProvider;

class MoodleController extends Controller
{
    protected $provider;

    public function __construct()
    {
        $this->provider = new GenericProvider([
            'clientId'                => env('MOODLE_CLIENT_ID'),
            'clientSecret'            => env('MOODLE_CLIENT_SECRET'),
            'redirectUri'             => env('APP_URL') . '/callback',
            'urlAuthorize'            => 'https://moodle.example.com/oauth2/authorize',
            'urlAccessToken'          => 'https://moodle.example.com/oauth2/token',
            'urlResourceOwnerDetails' => 'https://moodle.example.com/oauth2/resource'
        ]);
    }

    public function redirectToProvider()
    {
        $authorizationUrl = $this->provider->getAuthorizationUrl();
        session(['oauth2state' => $this->provider->getState()]);

        return redirect($authorizationUrl);
    }

    public function handleProviderCallback(Request $request)
    {
        // Verificar el estado
        $state = $request->session()->pull('oauth2state');
        if (empty($state) || ($request->input('state') !== $state)) {
            return redirect('/')->with('error', 'Invalid OAuth state');
        }

        // Obtener el token de acceso
        try {
            $accessToken = $this->provider->getAccessToken('authorization_code', [
                'code' => $request->input('code')
            ]);
        } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
            return redirect('/')->with('error', $e->getMessage());
        }

        // Obtener detalles del usuario de Moodle
        $resourceOwner = $this->provider->getResourceOwner($accessToken);
        $user = $resourceOwner->toArray();

        // Aquí puedes manejar la información del usuario (guardar en base de datos, iniciar sesión, etc.)
        return redirect('/home')->with('success', 'Logged in as ' . $user['fullname']);
    }
}
