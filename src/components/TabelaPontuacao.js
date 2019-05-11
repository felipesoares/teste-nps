import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Dicionario from "./Dicionario";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function TabelaPontuacao(props) {
  const { classes } = props;

  const [respostas, setRespostas] = useState("");

  useEffect(() => {
    setRespostas(JSON.parse(localStorage.getItem("respostas")));
  });

  function calcularNPS() {
    let respostas = JSON.parse(localStorage.getItem("respostas"));

    if (respostas) {
      let promotores = respostas.filter(item => item.score >= 9).length;
      let detratores = respostas.filter(item => item.score <= 6).length;
      let respondentes = respostas.length;

      return (promotores - detratores) / respondentes;
    }
    return 0;
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>
              {Dicionario[props.language].tituloPontuacaoColunaScore}
            </TableCell>
            <TableCell align="left">
              {Dicionario[props.language].tituloPontuacaoColunaJustificativa}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {respostas ? (
            Object.keys(respostas).map(key => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{respostas[key].score}</TableCell>
                <TableCell align="left">
                  {respostas[key].justificativa ? respostas[key].justificativa : "-"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="left" colSpan={3}>
                {Dicionario[props.language].labelPontuacaoSemResultados}
              </TableCell>
            </TableRow>
          )}
          {respostas ? (
            <TableRow>
              <TableCell align="right" colSpan={3}>
                NPS: { (calcularNPS() * 100).toString().slice(0, 5).replace(".", ",") }%
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </Paper>
  );
}

TabelaPontuacao.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabelaPontuacao);
