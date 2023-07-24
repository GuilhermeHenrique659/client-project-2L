import jwt_decode from "jwt-decode";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isTokenExpired = (token: string) => {
    try {
        const decodedToken = jwt_decode<{ exp: number }>(token);
        const currentTime = Date.now() / 1000; // convertendo para segundos

        return decodedToken.exp < currentTime;
    } catch (error) {
        return true; // caso ocorra algum erro na decodificação, considere como expirado
    }
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isTokenExpired(token)){
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/register/avatar", "/register/tags"],
};
