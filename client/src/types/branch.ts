export interface BranchesType {
  status: string;
  result: number;
  data: {
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    createdAt: Date;
    branchCoord: {
      lat: string;
      long: string;
    };
    branchWorkingHours: {
      weekDay: string;
      hour: string;
      _id: string;
    }[];
  }[];
}

export interface BranchType {
  status: string;
  data: {
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    createdAt: Date;
    branchCoord: {
      lat: string;
      long: string;
    };
    branchWorkingHours: {
      weekDay: string;
      hour: string;
      _id: string;
    }[];
  };
}
