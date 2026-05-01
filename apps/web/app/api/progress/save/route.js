import { auth } from "@namaz/auth";
import { prisma } from "@namaz/db";

export async function POST(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { salahType, mistakes, score, duration, isOfflineSync } = await req.json();

    const progress = await prisma.salahProgress.create({
      data: {
        userId: session.user.id,
        salahType,
        mistakes: mistakes || [],
        score: score || 100,
        duration: duration || 0,
        isOfflineSync: isOfflineSync || false,
        completedAt: new Date()
      }
    });

    if (mistakes && mistakes.length > 0) {
      await prisma.salahMistake.createMany({
        data: mistakes.map(mistakeId => ({
          userId: session.user.id,
          salahProgressId: progress.id,
          mistakeType: mistakeId,
          severity: "medium",
          detectedAt: new Date()
        }))
      });
    }

    return Response.json({ success: true, progress });
  } catch (error) {
    console.error("Error saving progress:", error);
    return Response.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}