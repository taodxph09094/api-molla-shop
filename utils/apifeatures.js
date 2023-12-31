class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  byDate() {
    const dateFind = this.queryStr.dateFind
      ? {
          dateFind: {
            $regex: this.queryStr.dateFind,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...dateFind });
    return this;
  }
  byMonthAndYear() {
    const monAndDate = this.queryStr.monAndDate
      ? {
          dateFind: {
            $regex: this.queryStr.monAndDate,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...monAndDate });
    return this;
  }
  byStatus() {
    const status = this.queryStr.status
      ? {
          orderStatus: {
            $regex: this.queryStr.status,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...status });
    return this;
  }
  byNumber() {
    const number = this.queryStr.number
      ? {
          userNumber: {
            $regex: this.queryStr.number,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...number });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = [
      "keyword",
      "page",
      "limit",
      "dateFind",
      "monAndDate",
      "status",
      "number",
    ];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
