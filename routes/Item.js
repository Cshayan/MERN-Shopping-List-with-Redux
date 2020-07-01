/* route file for items */

const express = require('express');
const router = express.Router();

// auth middleware
const auth = require('../middleware/auth');

// model
const Item = require('../models/Item');

/*  Desc - Get all the items
 *  Method - GET
 *  Enpoint - api/v1/items
 */
router.get('/', async (req, res, next) => {
    try {
        const items = await Item.find();

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched items',
            count: items.length,
            data: items
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in fetching items',
        });
    }
});

/*  Desc - Add a item
 *  Method - POST
 *  Enpoint - api/v1/items
 *  Access - Private
 */
router.post('/', auth, async (req, res, next) => {
    try {
        const item = await Item.create(req.body);

        return res.status(201).json({
            success: true,
            message: 'Successfully added an item',
            data: item
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in adding an item',
        });
    }
});

/*  Desc - Delete a item
 *  Method - POST
 *  Access - Private
 *  Enpoint - api/v1/items/:id
 */
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found to delete',
            });
        }

        await item.remove();

        return res.status(200).json({
            success: false,
            message: 'Item deleted successfully',
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in deleting an item',
        });
    }
})

module.exports = router;