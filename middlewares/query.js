const query = (model) => {
    return async (req, res, next) => {
        try {
            let filter = { ...req.query };
            const excludeFields = ['page', 'sort', 'limit', 'fields'];
            excludeFields.forEach((field) => delete filter[field]);

            let queryStr = JSON.stringify(filter).replace(
                /\b(gte|gt|lte|lt)\b/g,
                (match) => `$${match}`
            );
            filter = JSON.parse(queryStr);

            req.filter = filter;
            req.sortBy = req.query.sort;
            req.fields = req.query.fields;
            req.page = parseInt(req.query.page, 10) || 1;
            req.limit = parseInt(req.query.limit, 10) || 5;

            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = { query };
