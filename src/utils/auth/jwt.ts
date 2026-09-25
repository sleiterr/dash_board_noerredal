import { jwtVerify, SignJWT, type JWTPayload } from "jose";

const issuer = "teamsdash";
const audience = "teamsdash";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(email)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    issuer,
    audience,
    algorithms: ["HS256"],
  });

  return payload;
}
