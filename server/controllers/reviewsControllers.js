const db = require('../models/poolsModels');
const reviewsControllers = {};


// middleware for getting reviews

reviewsControllers.getReviews = async (req, res, next) => {
    try {
        const { master_id } = req.params;
        const sqlGetQuery = `SELECT * FROM reviews WHERE master_id = ${master_id}`;
        const result = await db.query(sqlGetQuery);
        res.locals.reviews = result.rows;
        return next();
    } catch(err) {
        return next({
            log: 'error',
            message: { err: 'Error in fetching reviews'}
        });
    }
}


// middleware for adding new review
reviewsControllers.postReview = async (req, res, next) => {
    try {
        const { master_id } = req.params;
        const { comment, user_id } = req.body;
        const sqlAddQuery = `INSERT INTO reviews(master_id, comment, user_id) VALUES('${master_id}', '${comment}', '${user_id}')`;
        const result = await db.query(sqlAddQuery);
        res.locals.review = result.rows[0];
        return next();
    } catch(err) {
        return next({
            log: 'error',
            message: { err: 'Error in posting review'}
        });
    }
}


module.exports = reviewsControllers;
