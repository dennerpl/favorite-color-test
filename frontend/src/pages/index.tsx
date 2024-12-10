import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSession } from "../SessionContext";
import { ApiService } from "../api/api-service";

export default function HomePage() {
  const { session } = useSession();
  const [selectedColor, setSelectedColor] = React.useState("");
  const [colors, setColors] = React.useState<Record<string, any>>();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
    if (!session?.user?.id) {
      return;
    }
    ApiService.updatePatch(`/users/${session?.user?.id}`, {
      favoriteColorId: event.target.value,
    });
  };

  const colorOptions = React.useMemo(() => {
    return colors?.map((color: any) => {
      return (
        <MenuItem key={color.id} value={color.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "1px solid",
                backgroundColor: color.hexCode,
              }}
            />
            {color.name}
          </div>
        </MenuItem>
      );
    });
  }, [colors]);

  React.useEffect(() => {
    ApiService.retrieve("/colors").then((response) => {
      setColors(response.data);
    });
    ApiService.retrieve(`/users/${session?.user?.id}`).then((response) => {
      setSelectedColor(response.data?.favoriteColor?.id);
    });
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Avatar
          alt="User Image"
          style={{ width: "2rem", height: "2rem" }}
          src={session?.user?.image ?? ""}
        />
        <Typography>Bem vindo(a) {session?.user?.name}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Typography>Selecione sua cor favorita</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Cor favorita</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedColor}
              label="Cor favorita"
              onChange={handleChange}
              style={{ width: "200px" }}
            >
              {colorOptions}
            </Select>
          </FormControl>
        </Box>
      </div>
    </Card>
  );
}
