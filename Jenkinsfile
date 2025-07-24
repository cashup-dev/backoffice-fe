@Library('global-pipeline') _

GlobalPipeline() {
  dockerImage = "cz_promo_fe:latest"
  projectName = "cz_promo_fe"
  appPort = "3000"
  buildArgs = [
    JWT_SECRET : "burungkakaasdasdasdasdasdasdasdasdasdasdasdtua",
    NODE_ENV: "production",
    PROMO_ENGINE_API: "http://10.10.7.48:8088/"
  ]
}