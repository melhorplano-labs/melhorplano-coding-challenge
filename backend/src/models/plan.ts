export interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  operator: string;
  city: string;
  dataCap: number; // franquia em GB
}

export const parseSpeed = (speed: string) => {
  const unit = speed.replace(/\d/g, "");
  const amountInMbps = parseInt(speed.replace(/\D/g, ""));

  const multiplier =
    {
      Mbps: 1,
      Gbps: 1000,
    }[unit] ?? 1;

  return multiplier * amountInMbps;
};
