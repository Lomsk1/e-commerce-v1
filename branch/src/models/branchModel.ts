import mongoose, { Document, Model } from "mongoose";

// An interface that describes the properties
// that are required to create a new Branch
interface BranchAttrs {
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
  }[];
}

// An interface that describes the properties
// that a Branch Model has
interface BranchModel extends Model<BranchDoc> {
  build(attrs: BranchAttrs): BranchDoc;
}

// An interface that describes the properties
// that a Branch Document has
export interface BranchDoc extends Document {
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
    [x: string]: any;
    weekDay: string;
    hour: string;
  }[];
}

const branchSchema = new mongoose.Schema<BranchAttrs>(
  {
    name: {
      type: String,
      required: [true, "A branch must have a name"],
    },
    city: {
      type: String,
      required: [true, "A branch must have a city"],
    },
    address: {
      type: String,
      required: [true, "A branch must have a address"],
    },
    phone: {
      type: String,
      required: [true, "A branch must have a phone"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    branchCoord: {
      lat: {
        type: String,
        required: [true, "A coord of branch must have a lat"],
      },
      long: {
        type: String,
        required: [true, "A coord of branch must have a long"],
      },
    },
    branchWorkingHours: [
      {
        weekDay: {
          type: String,
          required: [true, "Please, add working week day"],
        },
        hour: {
          type: String,
          required: [true, "Please, add working hour"],
        },
      },
    ],
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Branch = mongoose.model<BranchDoc, BranchModel>("Branch", branchSchema);

export default Branch;
