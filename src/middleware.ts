'use client';

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import LocalStorageHelpers from "./common/helpers/localStorageHelper";
import { CreateUserResponse } from "./repository/user/types/CreateUserResponse";


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value


    if(!token){
        return NextResponse.redirect(new URL("/login", request.url));
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/register/avatar", "/register/tag"],
};
