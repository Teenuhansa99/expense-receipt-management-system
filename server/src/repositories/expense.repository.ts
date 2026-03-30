import { pool } from "../config/db";
import { CreateExpenseInput, UpdateExpenseInput } from "../models/expense.types";

export const expenseRepository = {
  async create(data: CreateExpenseInput) {
    const query = `
      INSERT INTO expenses (title, amount, category, expense_date, receipt_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      data.title,
      data.amount,
      data.category,
      data.expenseDate,
      data.receiptUrl || null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll(filters: {
    search?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) {
    let query = `SELECT * FROM expenses WHERE 1=1`;
    const values: (string | number)[] = [];
    let index = 1;

    if (filters.search) {
      query += ` AND LOWER(title) LIKE LOWER($${index})`;
      values.push(`%${filters.search}%`);
      index++;
    }

    if (filters.category) {
      query += ` AND category = $${index}`;
      values.push(filters.category);
      index++;
    }

    if (filters.startDate) {
      query += ` AND expense_date >= $${index}`;
      values.push(filters.startDate);
      index++;
    }

    if (filters.endDate) {
      query += ` AND expense_date <= $${index}`;
      values.push(filters.endDate);
      index++;
    }

    query += ` ORDER BY expense_date DESC, id DESC`;

    const result = await pool.query(query, values);
    return result.rows;
  },

  async findById(id: number) {
    const result = await pool.query(`SELECT * FROM expenses WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async update(id: number, data: UpdateExpenseInput) {
    const existing = await this.findById(id);

    if (!existing) {
      return null;
    }

    const query = `
      UPDATE expenses
      SET title = $1,
          amount = $2,
          category = $3,
          expense_date = $4,
          receipt_url = $5,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;

    const values = [
      data.title ?? existing.title,
      data.amount ?? existing.amount,
      data.category ?? existing.category,
      data.expenseDate ?? existing.expense_date,
      data.receiptUrl !== undefined ? data.receiptUrl : existing.receipt_url,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(id: number) {
    const result = await pool.query(`DELETE FROM expenses WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  },

  async getSummary() {
    const totalResult = await pool.query(`
      SELECT 
        COUNT(*)::int AS total_count,
        COALESCE(SUM(amount), 0)::float AS total_amount
      FROM expenses
    `);

    const categoryResult = await pool.query(`
      SELECT 
        category,
        COALESCE(SUM(amount), 0)::float AS total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);

    return {
      totalCount: totalResult.rows[0].total_count,
      totalAmount: totalResult.rows[0].total_amount,
      categoryBreakdown: categoryResult.rows,
    };
  },
};