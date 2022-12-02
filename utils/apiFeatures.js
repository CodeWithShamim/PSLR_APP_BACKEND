class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const params = { ...this.queryString };
    const excludedParams = ["sort", "page", "fields", "limit", "keyword"];
    excludedParams.forEach((el) => delete params[el]);
    let queryStr = JSON.stringify(params);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);
    const filterQuery = {
      ...JSON.parse(queryStr),
      $text: { $search: this.queryString.keyword } ,
    };
    this.query.find(filterQuery);
    return this;
  }

  sort() {
    let sort = "-createdAt";
    if (this.queryString.sort) {
      sort = this.queryString.sort.split(",").join(" ");
    }
    this.query.sort(sort);
    return this;
  }

  fieldLimiting() {
    let fields = "-__v";
    if (this.queryString.fields) {
      fields = this.queryString.fields.split(",").join("");
    }
    this.query.select(fields);
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 7;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
