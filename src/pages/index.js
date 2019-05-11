import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";
import { TextField, Fade } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";

import TabelaPontuacao from "../components/TabelaPontuacao";
import Dicionario from "../components/Dicionario";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(920 + theme.spacing.unit * 3 * 2)]: {
      width: 920,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  heroContent: {
    // maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssRoot: {
    // color: theme.palette.getContrastText(red[500]),
    color: "#fff",
    // backgroundColor: red[500],
    "&:hover": {
      // backgroundColor: red[700],
      opacity: "1 !important"
    }
  }
});

const questions = [
  {
    subheader: "",
    description: {
      0: { default: "#b92026", hover: "#b92026" },
      1: { default: "#d52227", hover: "#d52227" },
      2: { default: "#f05025", hover: "#f05025" },
      3: { default: "#f46e21", hover: "#f46e21" },
      4: { default: "#f7a921", hover: "#f7a921" },
      5: { default: "#ffca26", hover: "#ffca26" },
      6: { default: "#eedb10", hover: "#eedb10" },
      7: { default: "#eae73d", hover: "#eae73d" },
      8: { default: "#c8d72f", hover: "#c8d72f" },
      9: { default: "#b1d137", hover: "#b1d137" },
      10: { default: "#65b54d", hover: "#65b54d" }
    },
    dicionario: {
      pt: {
        title: "Indicação",
        questao:
          "Em uma escala de 0 a 10, o quanto você indicaria a EMPRESA a um amigo ou familiar?"
      },
      en: {
        title: "Indication",
        questao:
          "On a scale of 0 to 10, how much would you indicate COMPANY to a friend or family member?"
      }
    }
  }
];

function Index(props) {
  const { classes } = props;

  const [language, setLanguage] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "pt"
  );
  const [score, setScore] = useState("");
  const [justificativa, setJustificativa] = useState("");

  const [formOk, setFormOk] = useState(false);

  if (!localStorage.getItem("language")) {
    localStorage.setItem("language", language);
  }

  // registra as respostas no localStorage
  function salvarResposta() {
    let respostas = JSON.parse(localStorage.getItem("respostas"));

    if (!respostas) respostas = [];

    respostas.push({
      score: score,
      justificativa: justificativa
    });

    localStorage.setItem("respostas", JSON.stringify(respostas));

    // exibe a mensagem de agradecimento
    setFormOk(true);

    // reseta o formulário para uma nova pesquisa
    setScore("");
    setJustificativa("");
  }

  // limpa as respostas do localStorage
  function limparPesquisa() {
    localStorage.removeItem("respostas");
  }

  function renderJustificativa() {
    if (score <= 7 && score != "") {
      return (
        <Fade in={score <= 7 && score != ""}>
          <TextField
            id="justificativa"
            label={Dicionario[language].labelCampoJustificativa}
            multiline
            rows="4"
            value={justificativa}
            onChange={event => setJustificativa(event.target.value)}
            // className={classes.textField}
            fullWidth
            margin="normal"
            helperText=""
            variant="outlined"
          />
        </Fade>
      );
    }
    return <div />;
  }

  function renderPesquisaSatisfacao() {
    if (!formOk) {
      return (
        <div>
          {Object.keys(questions).map(key => (
            <Card key={key}>
              <CardHeader
                title={questions[key].dicionario[language].title}
                subheader={questions[key].subheader}
                titleTypographyProps={{ align: "left" }}
                subheaderTypographyProps={{ align: "left" }}
                action={
                  questions[key].dicionario[language].title === "Pro" ? (
                    <StarIcon />
                  ) : null
                }
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.margin}>
                  <Typography component="h2" variant="h6" color="textPrimary">
                    {questions[key].dicionario[language].questao}
                  </Typography>
                </div>

                {Object.keys(questions[key].description).map(index => (
                  <Button
                    key={index}
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      opacity: score == index || score == "" ? "1" : "0.4",
                      backgroundColor: questions[key].description[index].default,
                      "&:hover": {
                        opacity: questions[key].description[index].hover
                      }
                    }}
                    onClick={() => setScore(index)}
                    className={classNames(classes.margin, classes.cssRoot)}
                  >
                    {index}
                  </Button>
                ))}

                <div className={classes.margin}>
                  {renderJustificativa()}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      margin: "20px 0 0"
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={score == "" || (score <= 7 && !justificativa)}
                      onClick={() => salvarResposta(true)}
                    >
                      {Dicionario[language].btnResponderPesquisa}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <Fade in={formOk}>
          <Card>
            <CardHeader
              title={Dicionario[language].tituloCardAgradecimento}
              subheader={""}
              titleTypographyProps={{ align: "left" }}
              subheaderTypographyProps={{ align: "left" }}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.margin}>
                <Typography component="h2" variant="h6" color="textPrimary">
                  {Dicionario[language].mensagemCardAgradecimento}
                </Typography>
              </div>

              <div className={classes.margin}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "20px 0 0"
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setFormOk(false)}
                  >
                    {Dicionario[language].btnResponderNovamente}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Fade>
      );
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <a href="" style={{ textDecoration: "none", color: "inherit" }}>
              NPS
            </a>
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            color={language == "pt" ? "primary" : ""}
            onClick={() => {
              setLanguage("pt");
              localStorage.setItem("language", "pt");
            }}
          >
            PT
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            color={language == "en" ? "primary" : ""}
            onClick={() => {
              setLanguage("en");
              localStorage.setItem("language", "en");
            }}
          >
            EN
          </Button>
          {/* <Button color="primary" variant="outlined">
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {Dicionario[language].tituloPaginaPrincipal}
          </Typography>
        </div>
        {/* End hero unit */}
        <Grid container spacing={40} alignItems="flex-end">
          <Grid item key={""} xs={12} sm={12} md={12}>
            {renderPesquisaSatisfacao()}

            <Card
              style={{
                margin: "48px 0 0"
              }}
            >
              <CardHeader
                title={Dicionario[language].tituloCardPontuacao}
                subheader={""}
                titleTypographyProps={{ align: "left" }}
                subheaderTypographyProps={{ align: "left" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <TabelaPontuacao language={language} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "20px 0 0"
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => limparPesquisa(false)}
                  >
                    {Dicionario[language].btnLimparPesquisa}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
      {/* Footer */}
      <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly" />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
