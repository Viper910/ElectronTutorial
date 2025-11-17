import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Grid,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  data: any;
};

export default function SystemInfoDashboard({ data }: Props) {
  const sections = [
    { title: "System", key: "system" },
    { title: "BIOS", key: "bios" },
    { title: "Motherboard", key: "baseboard" },
    { title: "Chassis", key: "chassis" },
    { title: "Operating System", key: "os" },
    { title: "UUID", key: "uuid" },
    { title: "CPU", key: "cpu" },
    { title: "CPU Cache", key: "cpuCache" },
    { title: "RAM Modules", key: "ramModules", isList: true },
    { title: "GPU", key: "gpu" },
    { title: "Disk Layout", key: "diskLayout", isList: true },
    { title: "Block Devices", key: "blockDevices", isList: true },
    { title: "Network Interfaces", key: "networkInterfaces", isList: true },
    { title: "Audio Devices", key: "audio", isList: true },
    { title: "Printers", key: "printers", isList: true },
    { title: "USB Devices", key: "usb", isList: true },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
        System Information Dashboard
      </Typography>

      <Grid container spacing={3}>
        {sections.map((sec) => (
          <Grid key={sec.key}>
            <InfoSection
              title={sec.title}
              data={data[sec.key]}
              isList={sec.isList}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function InfoSection({
  title,
  data,
  isList = false,
}: {
  title: string;
  data: any;
  isList?: boolean;
}) {
  return (
    <Card variant="outlined">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isList ? (
            Array.isArray(data) &&
            data.map((item: any, index: number) => (
              <Card
                key={index}
                variant="outlined"
                sx={{ mb: 2, p: 2, borderRadius: 1 }}
              >
                <KeyValueTable data={item} />
              </Card>
            ))
          ) : (
            <KeyValueTable data={data} />
          )}
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

function KeyValueTable({ data }: { data: any }) {
  if (!data || Object.keys(data).length === 0) {
    return <Typography variant="body2">No data available</Typography>;
  }

  return (
    <Table size="small">
      <TableBody>
        {Object.entries(data).map(([key, value]) => (
          <TableRow key={key} hover>
            <TableCell sx={{ fontWeight: 600, width: "30%" }}>
              {formatKey(key)}
            </TableCell>
            <TableCell>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {formatValue(value)}
              </pre>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(value: any) {
  if (value === null) return "null";
  if (Array.isArray(value)) return JSON.stringify(value, null, 2);
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return value.toString();
}