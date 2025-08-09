const express = require('express');
const { body, query, validationResult } = require('express-validator');
const pool = require('../config/db');

const router = express.Router();

// Add School API
router.post(
  '/addSchool',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, latitude, longitude } = req.body;

    try {
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
      );

      res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database error', error });
    }
  }
);

// List Schools API with optional radius filter
router.get(
  '/listSchools',
  [
    query('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    query('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
    query('radius').optional().isFloat({ min: 0 }).withMessage('Invalid radius') // optional filter
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    const radius = req.query.radius ? parseFloat(req.query.radius) : null;

    try {
      const [schools] = await pool.query('SELECT * FROM schools');

      // Calculate distance using Haversine formula
      let withDistance = schools.map(school => {
        const R = 6371; // Earth radius in km
        const dLat = (school.latitude - userLat) * Math.PI / 180;
        const dLon = (school.longitude - userLon) * Math.PI / 180;

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(userLat * Math.PI / 180) *
          Math.cos(school.latitude * Math.PI / 180) *
          Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = Number((R * c).toFixed(3));

        return { ...school, distance_km: distance };
      });

      // Filter by radius if provided
      if (radius !== null) {
        withDistance = withDistance.filter(school => school.distance_km <= radius);
      }

      // Sort by proximity
      withDistance.sort((a, b) => a.distance_km - b.distance_km);

      res.json({
        success: true,
        count: withDistance.length,
        data: withDistance
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Database error', error });
    }
  }
);


module.exports = router;
