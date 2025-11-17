import { writeFile } from "fs/promises";
import { getStaticSystemInfo } from "./systemInfo.js";
import {
  getCPUUsage,
  getMemoryUsage,
  getGPUUsage,
  getNetworkUsage,
  getDiskUsage,
  CPUUsage,
  MemoryUsage,
  GPUUsage,
  NetworkUsage,
  DiskUsage,
  LiveUsage,
} from "./systemUsage.js";

// ----------------------
// Save static system info to file
// ----------------------
export async function saveStaticInfo(filePath = "Output.json") {
  try {
    console.log("Fetching static system info...");
    const staticInfo = await getStaticSystemInfo();

    console.log("=== STATIC INFO ===");
    console.log(JSON.stringify(staticInfo, null, 2));

    await writeFile(filePath, JSON.stringify(staticInfo, null, 2), "utf-8");
    console.log(`Static system info saved to ${filePath}`);
  } catch (error) {
    console.error("Error fetching or saving static system info:", error);
  }
}

// ----------------------
// Fetch live state independently
// ----------------------
export async function getLiveState(): Promise<LiveUsage> {
  const liveUsage: Partial<LiveUsage> = {};

  try {
    liveUsage.cpu = await getCPUUsage();
  } catch (err) {
    console.error("Error fetching CPU usage:", err);
  }

  try {
    liveUsage.memory = await getMemoryUsage();
  } catch (err) {
    console.error("Error fetching memory usage:", err);
  }

  try {
    liveUsage.gpu = await getGPUUsage();
  } catch (err) {
    console.error("Error fetching GPU usage:", err);
  }

  try {
    liveUsage.network = await getNetworkUsage();
  } catch (err) {
    console.error("Error fetching network usage:", err);
  }

  try {
    liveUsage.disks = await getDiskUsage();
  } catch (err) {
    console.error("Error fetching disk usage:", err);
  }

  return liveUsage as LiveUsage;
}

// ----------------------
// Live system usage monitor
// ----------------------
export function startLiveMonitor(intervalMs = 1000) {
  console.log("\nStarting live usage monitor...\n");

  setInterval(async () => {
    try {
      const usage = await getLiveState();

      console.clear();
      console.log("=== LIVE USAGE ===");
      console.log(JSON.stringify(usage, null, 2));
    } catch (error) {
      console.error("Error fetching live system usage:", error);
    }
  }, intervalMs);
}

// ----------------------
// Entry point
// ----------------------
export async function main() {
  // Fetch and save static info once
  await saveStaticInfo();

  // Start live usage monitoring
  startLiveMonitor(1000); // every second
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
