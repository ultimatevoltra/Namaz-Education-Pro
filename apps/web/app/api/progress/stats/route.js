import { auth } from "@namaz/auth";
import { prisma } from "@namaz/db";

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await prisma.salahProgress.findMany({
      where: {
        userId: session.user.id,
        completedAt: {
          gte: today
        }
      }
    });

    const mistakeStats = await prisma.salahMistake.findMany({
      where: {
        userId: session.user.id,
        detectedAt: {
          gte: today
        }
      }
    });

    const completedPrayers = stats.length;
    const averageScore = completedPrayers > 0 
      ? stats.reduce((sum, s) => sum + s.score, 0) / completedPrayers
      : 0;
    const totalDuration = stats.reduce((sum, s) => sum + (s.duration || 0), 0);
    const mistakeCount = mistakeStats.length;

    return Response.json({
      completedPrayers,
      averageScore,
      totalDuration,
      mistakeCount
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}