import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const secret = `${process.env.NEXTAUTH_SECRET}`;

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  return NextResponse.next();
};

export { middleware };
