// https://gist.github.com/ghinda/8442a57f22099bdb2e34?permalink_comment_id=4268115#gistcomment-4268115

export default function parseGenericObject<T>(
  object: T,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData();
  for (const property in object) {
    const contextProperty = object[property];

    const formKey = namespace ? `${namespace}[${property}]` : property;

    if (typeof contextProperty === 'object' && !(contextProperty instanceof File)) {
      parseGenericObject(contextProperty, formData, formKey);
    } else {
      formData.append(formKey, contextProperty as string | File);
    }
  }

  return formData;
}
