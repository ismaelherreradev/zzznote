import type { NextRequest } from "next/server";
import { isWithinExpirationDate } from "oslo";
import { setSession } from "~/lib/auth/session";
import { deleteMagicToken, getMagicToken } from "~/lib/auth/utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return createErrorResponse("Token is not provided", "BAD_REQUEST", 400);
  }

  const existedToken = await getMagicToken(token);

  if (!existedToken || !isWithinExpirationDate(existedToken.tokenExpiresAt)) {
    if (existedToken) {
      await deleteMagicToken(token);
    }

    return createErrorResponse("Invalid or expired token", "BAD_REQUEST", 400);
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

function createErrorResponse(
  message: string,
  code: string,
  httpStatus: number,
) {
  return Response.json(
    {
      error: {
        message,
        data: {
          code,
          httpStatus,
        },
      },
    },
    {
      status: httpStatus,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
