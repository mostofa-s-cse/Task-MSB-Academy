import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface DocumentAttributes {
	id?: number,
	openaiResponse?: string | null,
	usersQuery?: string | null,
	createdAt?: Date,
	updatedAt? : Date
  }
  export interface DocumentInput extends Optional<DocumentAttributes, 'id'>{ }
  export interface DocumentOutput extends Required<DocumentAttributes>{ }
  
  class Document extends Model<DocumentAttributes, DocumentInput> implements DocumentAttributes {
	public id!: number;
	public openaiResponse!: string;
	public usersQuery!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt! : Date;
}
Document.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	usersQuery: {
		type: DataTypes.STRING,
		allowNull: true
	},
	openaiResponse: {
		type: DataTypes.STRING,
		allowNull: true
	},
}, {
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Document;