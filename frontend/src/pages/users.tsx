import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ApiService } from "../api/api-service";
import { Typography } from "@mui/material";

function createData(
  fullName: string,
  favoriteColor: Record<string, any> | null,
  email: string
) {
  return { fullName, favoriteColor, email };
}

export default function UsersPage() {
  const [usersList, setUsersList] = React.useState<Record<string, any>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [unauthorized, setUnauthorized] = React.useState(false);
  const [rows, setRows] = React.useState<Record<string, any>>([]);

  React.useEffect(() => {
    setRows(
      usersList.map((user: Record<string, any>) => {
        return createData(user.fullName, user.favoriteColor, user.email);
      })
    );
  }, [usersList]);

  React.useEffect(() => {
    setIsLoading(true);
    ApiService.retrieve("/users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((_error) => {
        setUnauthorized(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Typography>Carregando dados...</Typography>;
  }

  if (unauthorized) {
    return (
      <Typography>
        Somente os administradores podem acessar essa página
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome Completo</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Cor Favorita</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (row: {
              fullName: string;
              email: string;
              favoriteColor: { name: string; hexCode: string };
            }) => (
              <TableRow
                key={row.fullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.favoriteColor ? (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: "1px solid",
                          backgroundColor: row.favoriteColor.hexCode,
                        }}
                      />
                      {row.favoriteColor.name}
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
