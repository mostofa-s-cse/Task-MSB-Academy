import { Request, Response, response } from "express";
import { Op } from "sequelize";
import Document from "../db/models/Document";
import axios from "axios";

const generateResponse = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Extract the 'usersQuery' parameter from the request
        const { usersQuery } = req.body;

        // Make a request to OpenAI API
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: usersQuery
                }
            ],
            temperature: 0.5,
            max_tokens: 500,
            top_p: 1.0,
            frequency_penalty: 0.52,
            presence_penalty: 0.5,
            stop: ["10."]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Your-API-Key'
            }
        });

        // Extract the response data from the API response
        const data = response.data.choices[0].message;
        // Create a record of the chat response
        await Document.create({
            openaiResponse: data.content,
            usersQuery: usersQuery
        });

        // Return the response to the client
        return res.status(200).json({data,usersQuery:usersQuery});
    } catch (error: any) {
        // Handle exceptions (e.g., log the error)
        return res.status(500).json({ error: error.message });
    }
};

const getAllHistory = async (req: Request, res: Response): Promise<Response> => {
	try {
        const { page } = req.query;
        const skip = (parseInt(page as string) || 1) - 1; // Parse page to integer, default to 1
        const take = 5;
        const totalChatCount = await Document.count(); // Get total count of documents
        const totalPages = Math.ceil(totalChatCount / take); // Calculate total pages

        const chat = await Document.findAll({
            order: [['id', 'DESC']], // Order by id column in descending order
            offset: skip * take,
            limit: take
          });

        return res.status(200).json({
            success: true,
            message: 'Successfully get data',
            data: chat,
            totalPages:totalPages
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export default { generateResponse,getAllHistory};