import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SystemInfoDashboard from './SystemInfoDashboard'
type SystemInfo = {
  system: {
    manufacturer: string;
    model: string;
    version: string;
    serial: string;
    uuid: string;
    sku: string;
    virtual: boolean;
  };
  bios: {
    vendor: string;
    version: string;
    releaseDate: string;
    revision: string;
    serial: string;
  };
  baseboard: {
    manufacturer: string;
    model: string;
    version: string;
    serial: string;
    assetTag: string;
    memMax: number;
    memSlots: number;
  };
  chassis: {
    manufacturer: string;
    model: string;
    type: string;
    version: string;
    serial: string;
    assetTag: string;
    sku: string;
  };
  os: {
    platform: string;
    distro: string;
    release: string;
    codename: string;
    kernel: string;
    arch: string;
    hostname: string;
    fqdn: string;
    codepage: string;
    logofile: string;
    serial: string;
    build: string;
    servicepack: string;
    uefi: boolean;
    hypervisor: boolean;
    remoteSession: boolean;
  };
  uuid: {
    os: string;
    hardware: string;
    macs: string[];
  };
  cpu: {
    manufacturer: string;
    brand: string;
    vendor: string;
    family: string;
    model: string;
    stepping: string;
    revision: string;
    voltage: string;
    speed: number;
    speedMin: number;
    speedMax: number;
    governor: string;
    cores: number;
    physicalCores: number;
    performanceCores: number;
    efficiencyCores: number;
    processors: number;
    socket: string;
    flags: string;
    virtualization: boolean;
    cache: {
      l1d: number;
      l1i: number;
      l2: number;
      l3: number;
    };
  };
  ramModules: {
    size: number;
    bank: string;
    type: string;
    ecc: boolean;
    clockSpeed: number;
    formFactor: string;
    manufacturer: string;
    partNum: string;
    serialNum: string;
    voltageConfigured: number;
    voltageMin: number;
    voltageMax: number;
  }[];
  gpu: {
    controllers: {
      vendor: string;
      model: string;
      bus: string;
      vram: number;
      vramDynamic: boolean;
      subDeviceId: string;
    }[];
    displays: {
      vendor: string;
      model: string;
      deviceName: string;
      main: boolean;
      builtin: boolean;
      connection: string;
      resolutionX: number;
      resolutionY: number;
      sizeX: number;
      sizeY: number;
      pixelDepth: string;
      currentResX: number;
      currentResY: number;
      positionX: number;
      positionY: number;
      currentRefreshRate: number;
    }[];
  };
  diskLayout: {
    device: string;
    type: string;
    name: string;
    vendor: string;
    size: number;
    bytesPerSector: number;
    totalCylinders: number;
    totalHeads: number;
    totalSectors: number;
    totalTracks: number;
    tracksPerCylinder: number;
    sectorsPerTrack: number;
    firmwareRevision: string;
    serialNum: string;
    interfaceType: string;
    smartStatus: string;
    temperature: number | null;
  }[];
  networkInterfaces: {
    iface: string;
    ifaceName: string;
    default: boolean;
    ip4: string;
    ip4subnet: string;
    ip6: string;
    ip6subnet: string;
    mac: string;
    internal: boolean;
    virtual: boolean;
    operstate: string;
    type: string;
    duplex: string;
    mtu: string | number;
    speed: number | null;
    dhcp: boolean;
    dnsSuffix: string;
    ieee8021xAuth: string;
    ieee8021xState: string;
    carrierChanges: number;
  }[];
};
const mySystem: SystemInfo = {
  system: {
    manufacturer: "Micro-Star International Co., Ltd.",
    model: "Cyborg 15 A12UCX",
    version: "REV:1.0",
    serial: "9S715K111264ZN8000469",
    uuid: "34595c18-9745-ad44-9ab3-1c823e6a35c1",
    sku: "15K1.3",
    virtual: false
  },
  bios: {
    vendor: "American Megatrends International, LLC.",
    version: "E15K1IMS.315",
    releaseDate: "2024-09-19",
    revision: "",
    serial: "9S715K111264ZN8000469"
  },
  baseboard: {
    manufacturer: "Micro-Star International Co., Ltd.",
    model: "MS-15K1",
    version: "REV:1.0",
    serial: "BSS-0123456789",
    assetTag: "",
    memMax: 68719476736,
    memSlots: 2
  },
  chassis: {
    manufacturer: "Micro-Star International Co., Ltd.",
    model: "",
    type: "Notebook",
    version: "N/A",
    serial: "23PN088339",
    assetTag: "No Asset Tag",
    sku: ""
  },
  os: {
    platform: "Windows",
    distro: "Microsoft Windows 11 Home Single Language",
    release: "10.0.26100",
    codename: "",
    kernel: "10.0.26100",
    arch: "x64",
    hostname: "MSI",
    fqdn: "MSI",
    codepage: "437",
    logofile: "windows",
    serial: "00342-42645-90509-AAOEM",
    build: "26100",
    servicepack: "0.0",
    uefi: true,
    hypervisor: true,
    remoteSession: false
  },
  uuid: {
    os: "27030f11-c532-4cf1-be98-c39a1b4bf8d2",
    hardware: "34595c18-9745-ad44-9ab3-1c823e6a35c1",
    macs: ["1e:45:cb:f8:0d:58"]
  },
  cpu: {
    manufacturer: "Intel",
    brand: "Gen Intel® Core™ i5-12450H",
    vendor: "GenuineIntel",
    family: "6",
    model: "154",
    stepping: "3",
    revision: "",
    voltage: "",
    speed: 2,
    speedMin: 2,
    speedMax: 2,
    governor: "",
    cores: 12,
    physicalCores: 8,
    performanceCores: 12,
    efficiencyCores: 0,
    processors: 1,
    socket: "BGA1744",
    flags: "de pse mce sep mtrr mca cmov psn clfsh ds mmx fxsr sse sse2 ss htt tm ia64 pbe",
    virtualization: true,
    cache: {
      l1d: 327680,
      l1i: 393216,
      l2: 7340032,
      l3: 12582912
    }
  },
  ramModules: [
    {
      size: 8589934592,
      bank: "BANK 0/0",
      type: "DDR5",
      ecc: false,
      clockSpeed: 4800,
      formFactor: "SODIMM",
      manufacturer: "Samsung Electronics Inc.",
      partNum: "M425R1GB4BB0-CQKOL",
      serialNum: "03B3CEA2",
      voltageConfigured: 1.1,
      voltageMin: 1.1,
      voltageMax: 1.1
    },
    {
      size: 8589934592,
      bank: "BANK 0/1",
      type: "DDR5",
      ecc: false,
      clockSpeed: 4800,
      formFactor: "SODIMM",
      manufacturer: "Samsung Electronics Inc.",
      partNum: "M425R1GB4BB0-CQKOL",
      serialNum: "03B3CF8E",
      voltageConfigured: 1.1,
      voltageMin: 1.1,
      voltageMax: 1.1
    }
  ],
  gpu: {
    controllers: [
      {
        vendor: "NVIDIA",
        model: "NVIDIA GeForce RTX 2050",
        bus: "PCI",
        vram: 4096,
        vramDynamic: true,
        subDeviceId: "13B91462"
      },
      {
        vendor: "Intel Corporation",
        model: "Intel(R) UHD Graphics",
        bus: "PCI",
        vram: 2047.99609375,
        vramDynamic: true,
        subDeviceId: "13B91462"
      }
    ],
    displays: [
      {
        vendor: "",
        model: "Default Monitor",
        deviceName: "\\\\.\\DISPLAY1",
        main: true,
        builtin: true,
        connection: "INTERNAL",
        resolutionX: 1920,
        resolutionY: 1080,
        sizeX: 34,
        sizeY: 19,
        pixelDepth: "32",
        currentResX: 1920,
        currentResY: 1080,
        positionX: 0,
        positionY: 0,
        currentRefreshRate: 144
      }
    ]
  },
  diskLayout: [], // Continue filling from your JSON
  networkInterfaces: [] // Continue filling from your JSON
};

function App() {

  return (
    <>
      <SystemInfoDashboard data={mySystem} />
    </>
  )
}

export default App
