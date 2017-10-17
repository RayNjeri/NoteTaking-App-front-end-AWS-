export default {
  MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
    BUCKET: "notetaking-app-uploads"
  },

  apiGateway: {
    REGION: "us-east-1",
    URL: "https://545fbxor8j.execute-api.us-east-1.amazonaws.com/prod/"
  },
  cognito: {
    USER_POOL_ID: "us-east-1_E4Ps2PuAJ",
    APP_CLIENT_ID: "5mtr65usg1j8qmvq1ndm4c8cf7",
    REGION: "us-east-1",
    IDENTITY_POOL_ID: "us-east-1:fdf597da-d4a9-4056-b9df-6413253f3a58",
  }
}