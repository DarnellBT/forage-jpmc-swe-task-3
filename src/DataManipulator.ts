import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC: number =
      (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF: number =
      (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio: number = priceABC / priceDEF;
    const timestamp: Date =
      serverRespond[0].timestamp > serverRespond[1].timestamp
        ? serverRespond[0].timestamp
        : serverRespond[1].timestamp;
    const upperBound: number = 1 + 0.1;
    const lowerBound: number = 1 - 0.1;
    const triggerAlert: number | undefined =
      ratio > upperBound || ratio < lowerBound ? ratio : undefined;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
    };
  }
}
