import {
  MqttMessage,
  MqttModule,
  MqttService,
  OnMessageEvent
} from 'ngx-mqtt';

export const CREDS = {
  httpApiEndpoint: "https://s913cv.internetofthings.ibmcloud.com/api/v0002/",
  apiKey: "a-s913cv-vbffh6pfbm",
  apiToken: "DD)@!OGbWrdGfJb9zH"
}

export const MQTT_SERVICE_OPTIONS = {
  hostname: 's913cv.messaging.internetofthings.ibmcloud.com',
  port: 1883,
  clientId: 'a:s913cv:eggDrop',
  username: CREDS.apiKey,
  password: CREDS.apiToken
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}
