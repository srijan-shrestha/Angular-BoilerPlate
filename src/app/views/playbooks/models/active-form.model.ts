export class ActiveForm {

  code: string; // unique. example: user-bio
  formData: any; // json object, key value
  saving: boolean;

  constructor(
    code?: string,
    formData?: any,
    saving?: boolean
  ) {
    this.code = code;
    this.formData = formData;
    this.saving = saving;
  }
}
