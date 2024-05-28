<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LTIController extends Controller
{
    public function launch(Request $request)
    {
        $consumer_key = env('LTI_CONSUMER_KEY');
        $shared_secret = env('LTI_SHARED_SECRET');


        if ($this->isValidLtiRequest($request, $consumer_key, $shared_secret)) {

            return view('your-react-app');
        } else {

            Log::error('LTI authentication failed', $request->all());
            return response('Unauthorized', 401);
        }
    }

    private function isValidLtiRequest(Request $request, $consumer_key, $shared_secret)
    {
        $params = $request->all();


        $required_params = ['oauth_consumer_key', 'oauth_nonce', 'oauth_signature', 'oauth_signature_method', 'oauth_timestamp', 'oauth_version'];
        foreach ($required_params as $param) {
            if (!isset($params[$param])) {
                return false;
            }
        }

        if ($params['oauth_consumer_key'] !== $consumer_key) {
            return false;
        }

        $base_string = $this->buildBaseString($request->url(), 'POST', $params);
        $composite_key = rawurlencode($shared_secret) . '&';
        $oauth_signature = base64_encode(hash_hmac('sha1', $base_string, $composite_key, true));

        return $params['oauth_signature'] === $oauth_signature;
    }

    private function buildBaseString($baseURI, $method, $params)
    {
        $r = array();
        ksort($params);
        foreach ($params as $key => $value) {
            $r[] = "$key=" . rawurlencode($value);
        }
        return $method . "&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
    }
}
