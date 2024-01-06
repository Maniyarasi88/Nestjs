import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) role_id: Array<any>;
    @Prop({ required: true, unique: true }) email: string;
    // @Prop() pass: string; 
    @Prop({ select: false }) password: string;
    @Prop({ required: true }) mobile_number: string;
    @Prop({ required: true }) gender: string;
    @Prop({ required: true, unique: true }) user_id: string;
    @Prop({ default: true }) active: boolean;
    @Prop({ default: new Date() }) created_at: string;
    @Prop({ required: true }) created_by: string;
    @Prop({ default: new Date() }) updated_at: string;
    @Prop() updated_by: string;
    // @Prop() test: [{name:string , user :object}];

}
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
