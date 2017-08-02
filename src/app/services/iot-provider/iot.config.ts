import {
  MqttMessage,
  MqttModule,
  MqttService,
  OnMessageEvent
} from 'ngx-mqtt';

export const CREDS = {
  httpApiEndpoint: "https://b77cj3.internetofthings.ibmcloud.com/api/v0002/",
  apiKey: "a-b77cj3-wljzey1hwy",
  apiToken: "C4x5yi*K5vgm9eH1LM"
}

export const MQTT_SERVICE_OPTIONS = {
  hostname: 'b77cj3.messaging.internetofthings.ibmcloud.com',
  port: 1883,
  clientId: 'a:b77cj3:eggDrop',
  username: CREDS.apiKey,
  password: CREDS.apiToken
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}
