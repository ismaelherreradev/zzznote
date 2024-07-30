import type { NextRequest } from "next/server";
import { isWithinExpirationDate } from "oslo";
import { setSession } from "~/lib/auth/session";
import { deleteMagicToken, getMagicToken } from "~/lib/auth/utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return Response.json({
      error: {
        message: "Token is not existed",
        data: {
          code: "BAD_REQUEST",
          httpStatus: 400,
        },
      },
    });
  }

  const existedToken = await getMagicToken(token);

  if (!existedToken || !isWithinExpirationDate(existedToken.tokenExpiresAt)) {
    await deleteMagicToken(token);
    return Response.json({
      error: {
        message: "Invalid token",
        data: {
          code: "BAD_REQUEST",
          httpStatus: 400,
        },
      },
    });
  }

  await deleteMagicToken(token);
  await setSession(existedToken.userId);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/board",
    },
  });
}
