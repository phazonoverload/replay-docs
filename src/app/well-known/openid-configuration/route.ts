import { NextResponse } from 'next/server'

import { REPLAY_PUBLIC } from '@/lib/agentReadiness'

/**
 * /.well-known/openid-configuration
 *
 * The docs site itself doesn't issue tokens — Replay uses Auth0
 * (`webreplay.us.auth0.com`) as its OIDC provider. We expose a discovery
 * pointer so agents who land on docs.replay.io can find the real issuer
 * without having to know it ahead of time.
 *
 * Spec: http://openid.net/specs/openid-connect-discovery-1_0.html
 */
export const dynamic = 'force-static'
export const revalidate = false

export function GET() {
  const issuer = REPLAY_PUBLIC.authIssuer

  const config = {
    issuer,
    authorization_endpoint: `${issuer}authorize`,
    token_endpoint: `${issuer}oauth/token`,
    device_authorization_endpoint: `${issuer}oauth/device/code`,
    userinfo_endpoint: `${issuer}userinfo`,
    mfa_challenge_endpoint: `${issuer}mfa/challenge`,
    jwks_uri: `${issuer}.well-known/jwks.json`,
    registration_endpoint: `${issuer}oidc/register`,
    revocation_endpoint: `${issuer}oauth/revoke`,
    scopes_supported: [
      'openid',
      'profile',
      'offline_access',
      'name',
      'given_name',
      'family_name',
      'nickname',
      'email',
      'email_verified',
      'picture',
      'created_at',
      'identities',
      'phone',
      'address',
    ],
    response_types_supported: [
      'code',
      'token',
      'id_token',
      'code token',
      'code id_token',
      'token id_token',
      'code token id_token',
    ],
    code_challenge_methods_supported: ['S256', 'plain'],
    response_modes_supported: ['query', 'fragment', 'form_post'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['HS256', 'RS256', 'PS256'],
    token_endpoint_auth_methods_supported: [
      'client_secret_basic',
      'client_secret_post',
    ],
    claims_supported: [
      'aud',
      'auth_time',
      'created_at',
      'email',
      'email_verified',
      'exp',
      'family_name',
      'given_name',
      'iat',
      'identities',
      'iss',
      'name',
      'nickname',
      'phone_number',
      'picture',
      'sub',
    ],
    grant_types_supported: [
      'authorization_code',
      'implicit',
      'refresh_token',
      'urn:ietf:params:oauth:grant-type:device_code',
      'password',
      'http://auth0.com/oauth/grant-type/password-realm',
      'http://auth0.com/oauth/grant-type/passwordless/otp',
    ],
  }

  return NextResponse.json(config, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
