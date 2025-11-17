import si from "systeminformation";

export interface StaticSystemInfo {
    system: Awaited<ReturnType<typeof si.system>>;
    bios: Awaited<ReturnType<typeof si.bios>>;
    baseboard: Awaited<ReturnType<typeof si.baseboard>>;
    chassis: Awaited<ReturnType<typeof si.chassis>>;
    os: Awaited<ReturnType<typeof si.osInfo>>;
    uuid: Awaited<ReturnType<typeof si.uuid>>;

    cpu: Awaited<ReturnType<typeof si.cpu>>;
    cpuCache: Awaited<ReturnType<typeof si.cpuCache>>;

    ramModules: Awaited<ReturnType<typeof si.memLayout>>;

    gpu: Awaited<ReturnType<typeof si.graphics>>;

    diskLayout: Awaited<ReturnType<typeof si.diskLayout>>;
    blockDevices: Awaited<ReturnType<typeof si.blockDevices>>;

    networkInterfaces: Awaited<ReturnType<typeof si.networkInterfaces>>;
    audio: Awaited<ReturnType<typeof si.audio>>;
    printers: Awaited<ReturnType<typeof si.printer>>;
    usb: Awaited<ReturnType<typeof si.usb>>;
}

// ----------------------
// Static System Info Collector
// ----------------------
export async function getStaticSystemInfo(): Promise<StaticSystemInfo> {
    const [
        system,
        bios,
        baseboard,
        chassis,
        osData,
        uuid,
        cpu,
        cpuCache,
        ramModules,
        gpu,
        diskLayout,
        blockDevices,
        networkInterfaces,
        audio,
        printers,
        usb,
    ] = await Promise.all([
        si.system(),
        si.bios(),
        si.baseboard(),
        si.chassis(),
        si.osInfo(),
        si.uuid(),
        si.cpu(),
        si.cpuCache(),
        si.memLayout(),
        si.graphics(),
        si.diskLayout(),
        si.blockDevices(),
        si.networkInterfaces(),
        si.audio(),
        si.printer(),
        si.usb(),
    ]);

    return {
        system,
        bios,
        baseboard,
        chassis,
        os: osData,
        uuid,
        cpu,
        cpuCache,
        ramModules,
        gpu,
        diskLayout,
        blockDevices,
        networkInterfaces,
        audio,
        printers,
        usb,
    };
}
