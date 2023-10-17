interface APIFeatures {
  filter(): APIFeatures;
  sort(): APIFeatures;
  limitFields(): APIFeatures;
  paginate(): APIFeatures;
}

class APIFeatures {
  query: any;
  queryString: Record<string, any>;

  constructor(query: any, queryString: Record<string, any>) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // if (queryObj.price) {
    //   queryObj.price = {
    //     $gte: Number(queryObj.price.gte),
    //     $lte: Number(queryObj.price.lte),
    //   };
    //   console.log(queryObj.price);
    // }
    queryObj.price = {};
    if (queryObj.priceMax || queryObj.priceMin) {
      queryObj.price = {
        $gte: Number(queryObj.priceMin ? queryObj.priceMin : 0),
        $lte: Number(queryObj.priceMax ? queryObj.priceMax : 9999999),
      };
      queryObj.priceMin = undefined;
      queryObj.priceMax = undefined;
    } else {
      queryObj.price = undefined;
    }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const fixedQueryStr = queryStr.replace(/\$\$/g, "$");
    this.query = this.query.find(JSON.parse(fixedQueryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy: string = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); // except this field
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1; //string to number
    const limit = this.queryString.limit * 1 || 999;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
