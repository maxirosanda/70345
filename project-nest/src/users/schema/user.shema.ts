import { Schema , Prop, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class User extends Document {

    @Prop({required:true})
    first_name: string;

    @Prop({required:true})
    last_name: string;

    @Prop({required:true,unique:true})
    email: string;

    @Prop({required:true})
    password: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}


export const UserSchema = SchemaFactory.createForClass(User);
