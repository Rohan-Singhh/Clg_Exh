import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// TypeScript interface for health data
interface HealthData {
  age: number;
  height: number;
  weight: number;
  gender: string;
  activityLevel: string;
  symptoms?: string;
  sleepHours: number;
  waterIntake: number;
}

// Middleware for request validation
const validateHealthData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { age, height, weight, gender, activityLevel, sleepHours, waterIntake } =
    req.body;

  if (
    !age ||
    !height ||
    !weight ||
    !gender ||
    !activityLevel ||
    sleepHours == null ||
    waterIntake == null
  ) {
    return res.status(400).json({ error: "Missing required health data fields" });
  }
  if (age <= 0 || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: "Invalid age, height, or weight values" });
  }
  next();
};

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy" });
});

// Analyze health data endpoint
app.post("/api/analyze", validateHealthData, (req: Request, res: Response) => {
  try {
    const healthData: HealthData = req.body;
    console.log("Received health data:", healthData);

    const analysis = {
      bmi: calculateBMI(healthData),
      bmr: calculateBMR(healthData),
      calorieNeeds: calculateCalorieNeeds(healthData),
      sleepAnalysis: analyzeSleep(healthData),
      hydrationAnalysis: analyzeHydration(healthData),
      generalHealth: generateHealthRecommendations(),
    };

    res.json(analysis);
  } catch (error) {
    console.error("Error processing health data:", error);
    res.status(500).json({ error: "Failed to analyze health data" });
  }
});

// Function to calculate BMI
function calculateBMI(data: HealthData) {
  const bmi = Number((data.weight / Math.pow(data.height / 100, 2)).toFixed(1));
  return {
    value: bmi,
    category: getBMICategory(bmi),
    recommendation: getBMIRecommendation(bmi),
  };
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getBMIRecommendation(bmi: number): string {
  if (bmi < 18.5) return "Increase calorie intake with nutrient-rich foods";
  if (bmi < 25) return "Maintain balanced diet and exercise";
  if (bmi < 30) return "Reduce portion size and increase physical activity";
  return "Consult a doctor for a weight management plan";
}

// Function to calculate BMR
function calculateBMR(data: HealthData) {
  let bmr: number =
    data.gender.toLowerCase() === "male"
      ? 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
      : 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  return {
    value: Math.round(bmr),
    explanation: "BMR is the number of calories your body burns at rest",
  };
}

// Function to calculate calorie needs
function calculateCalorieNeeds(data: HealthData) {
  const bmr = calculateBMR(data).value;
  const activityMultipliers: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const multiplier = activityMultipliers[data.activityLevel] || 1.2;
  const maintenance = Math.round(bmr * multiplier);

  return {
    maintenance,
    weightLoss: Math.round(maintenance - 500),
    weightGain: Math.round(maintenance + 500),
  };
}

// Sleep analysis function
function analyzeSleep(data: HealthData) {
  const recommendedMin = 7;
  const recommendedMax = 9;
  return {
    current: data.sleepHours,
    recommended: `${recommendedMin}-${recommendedMax} hours`,
    status:
      data.sleepHours < recommendedMin
        ? "Insufficient"
        : data.sleepHours > recommendedMax
        ? "Excessive"
        : "Optimal",
  };
}

// Hydration analysis function
function analyzeHydration(data: HealthData) {
  const recommendedIntake = Math.round(data.weight * 0.033);
  return {
    current: data.waterIntake,
    recommended: recommendedIntake,
    status: data.waterIntake < recommendedIntake ? "Insufficient" : "Optimal",
  };
}

// Generate general health recommendations
function generateHealthRecommendations() {
  return {
    status: "Consult a professional for accurate advice",
    recommendations: [
      "Eat whole foods",
      "Exercise regularly",
      "Manage stress",
      "Sleep well",
      "Stay hydrated",
    ],
  };
}

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// Handle server errors
server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`⚠️ Port ${port} is already in use. Trying a different port...`);
    const newServer = app.listen(0, () => {
      console.log(`✅ New port assigned: ${(newServer.address() as any).port}`);
    });
  } else {
    console.error("❌ Server error:", err);
  }
});
