export interface MarketType {
  name: string;
  objectid: string;
  bounds: number[][];
  market: boolean;
  error?: string;
}

export interface MarketResponseType {
  id: number;
  data?: MarketType[];
  status?: number;
}

export interface MarketPropsType {
  devices?: [];
  environments?: [];
  gateways?: [];
  properties?: [];
  subscriptions?: [];
  users?: [];
}

export interface EnvironmentType {
  objectid: string;
  latitude?: number;
  longitude?: number;
  bounds: number[][];
  area: number;
}

export interface GatewayType {
  mac: string;
  status: string;
  market?: string;
  visible?: boolean;
  coverage?: {
    point: {
      x: number;
      y: number;
    }
  }
}

export interface DeviceType {
  tag: string;
  status: string | null;
  visible?: boolean;
}

export interface UserType {
  lastloginat: string;
  diffDays: string;
}

export interface MarketObjectType {
  objectid: string;
  name: string;
  gateways: GatewayType[];
  devices: DeviceType[];
  environments: EnvironmentType[];
  users: UserType[];
}

export interface PolygonType {
  objectid?: string;
  centroid?: boolean;
  visible?: boolean;
}

export interface environmentBoundsType {
  polygon?: [];
  bounds?: [];
  isEnvironment?: boolean;
}

export interface DrawedPolygonType {
  areas: boolean;
  environmentBounds: boolean;
  polygons: boolean;
  devices: boolean;
}