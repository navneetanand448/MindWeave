import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth,currentUser } from "@clerk/nextjs";
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});
const convex=new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);
export async function POST(request:Request){
  const authorization=await auth();
  const user=await currentUser();
  if(!authorization || user){
    return new Response("Unauthorized",{status:403});
  }
  const {room}=await request.json();
  const board=await convex.query(api.board.get,{id:room})
  
}