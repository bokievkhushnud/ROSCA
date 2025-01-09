export async function GET(req, res) {
  const { auth0Id } = await req.json();
  const user = await prisma.user.findUnique({ where: { auth0Id: auth0Id } });
  return NextResponse.json(user, { status: 200 });
}