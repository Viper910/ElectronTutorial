// systemUsage.ts
import si from "systeminformation";

// ----------------------
// Types
// ----------------------
export interface CPUUsage {
    load: number;
    temp: number | null;
}

export interface MemoryUsage {
    total: number;
    used: number;
    free: number;
    usagePercent: number;
}

export interface GPUUsage {
    name: string;
    usagePercent: number;
    vramUsed: number;
    vramTotal: number;
    temp: number | null;
}

export interface NetworkUsage {
    iface: string;
    rxSec: number;
    txSec: number;
}

export interface DiskUsage {
    fs: string;
    used: number;
    size: number;
    usagePercent: number;
}

// ----------------------
// Methods
// ----------------------

// CPU
export async function getCPUUsage(): Promise<CPUUsage> {
    const [load, temp] = await Promise.all([si.currentLoad(), si.cpuTemperature()]);
    return {
        load: load.currentLoad,
        temp: temp.main ?? null,
    };
}

// Memory
export async function getMemoryUsage(): Promise<MemoryUsage> {
    const mem = await si.mem();
    return {
        total: mem.total,
        used: mem.used,
        free: mem.free,
        usagePercent: (mem.used / mem.total) * 100,
    };
}

// GPU
export async function getGPUUsage(): Promise<GPUUsage[]> {
    const gpu = await si.graphics();
    return gpu.controllers.map(g => ({
        name: g.model,
        usagePercent: g.utilizationGpu ?? 0,
        vramUsed: g.memoryUsed ?? 0,
        vramTotal: g.vram ?? 0,
        temp: g.temperatureGpu ?? null,
    }));
}

type NetworkSnapshot = Awaited<ReturnType<typeof si.networkStats>>;
let previousNetworkStats: NetworkSnapshot | null = null;

export async function getNetworkUsage(): Promise<NetworkUsage[]> {
  const currentStats = await si.networkStats();

  if (!previousNetworkStats) {
    // First call: save snapshot, return 0 speeds
    previousNetworkStats = currentStats;
    return currentStats.map(n => ({
      iface: n.iface,
      rxSec: 0,
      txSec: 0,
    }));
  }

  const usage: NetworkUsage[] = currentStats.map((n, i) => {
    const prev = previousNetworkStats![i];
    const intervalSec = (n.ms - prev.ms) / 1000 || 1; // avoid divide by 0

    return {
      iface: n.iface,
      rxSec: (n.rx_bytes - prev.rx_bytes) / intervalSec,
      txSec: (n.tx_bytes - prev.tx_bytes) / intervalSec,
    };
  });

  // Update snapshot for next call
  previousNetworkStats = currentStats;

  return usage;
}

// Disks
export async function getDiskUsage(): Promise<DiskUsage[]> {
    const fs = await si.fsSize();
    return fs.map(d => ({
        fs: d.fs,
        used: d.used,
        size: d.size,
        usagePercent: (d.used / d.size) * 100,
    }));
}

// ----------------------
// Combined (optional)
// ----------------------
export interface LiveUsage {
    cpu: CPUUsage;
    memory: MemoryUsage;
    gpu: GPUUsage[];
    network: NetworkUsage[];
    disks: DiskUsage[];
}

export async function getLiveUsage(): Promise<LiveUsage> {
    const [cpu, memory, gpu, network, disks] = await Promise.all([
        getCPUUsage(),
        getMemoryUsage(),
        getGPUUsage(),
        getNetworkUsage(),
        getDiskUsage(),
    ]);

    return { cpu, memory, gpu, network, disks };
}
