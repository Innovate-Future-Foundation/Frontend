import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import Avatar from "@/components/Avatar";
import FormWrapper from "@/components/FormWrapper.tsx";
import { FormFieldItem } from "@/components/FormField";
import { usePermissions } from "@/hooks/use-permissions";

const orgProfileDetail = {
  orgName: "JR Academy",
  email: "admin@jracademy.com.au",
  logoUrl: "https://github.com/shadcn.png",
  websiteUrl: "https://jiangren.com.au/",

  address: {
    street: "123 Main Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia"
  },

  subscription: "free",
  status: "pending"
};

const companyInfoFormSchema = z.object({
  logoUrl: z.string().optional(),
  name: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters."
    })
    .max(50, {
      message: "Company name must not exceed 50 characters." // Restrains max length
    }),
  email: z.string().email({
    message: "Invalid email format."
  }),
  websiteUrl: z
    .string()
    .optional()
    .refine(value => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Website URL must be a valid URL (e.g., https://example.com)."
    })
});

const addressInfoFormSchema = z.object({
  street: z
    .string()
    .min(2, {
      message: "Street must be at least 2 characters."
    })
    .max(100, {
      message: "Street must not exceed 100 characters."
    })
    .optional(),
  suburb: z
    .string()
    .min(2, {
      message: "Suburb must be at least 2 characters."
    })
    .max(50, {
      message: "Suburb must not exceed 50 characters."
    })
    .optional(),
  state: z
    .string()
    .min(2, {
      message: "State must be at least 2 characters."
    })
    .max(20, {
      message: "State must not exceed 20 characters."
    })
    .optional(),
  postcode: z
    .string()
    .regex(/^\d{4}$/, {
      message: "Postcode must be a 4-digit number."
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters."
    })
    .max(50, {
      message: "Country must not exceed 50 characters."
    })
    .optional()
});

interface FormField {
  name: keyof z.infer<typeof companyInfoFormSchema>;
  label: string;
  placeholder: string;
  disabled: boolean;
}

const OrganisationProfile = () => {
  const { canEditOrganisationProfile } = usePermissions();

  const companyInfoForm = useForm<z.infer<typeof companyInfoFormSchema>>({
    resolver: zodResolver(companyInfoFormSchema),
    defaultValues: {
      name: orgProfileDetail.orgName,
      email: orgProfileDetail.email,
      logoUrl: orgProfileDetail.logoUrl,
      websiteUrl: orgProfileDetail.websiteUrl
    }
  });

  const addressInfoForm = useForm<z.infer<typeof addressInfoFormSchema>>({
    resolver: zodResolver(addressInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      street: orgProfileDetail.address?.street,
      suburb: orgProfileDetail.address?.suburb,
      state: orgProfileDetail.address?.state,
      postcode: orgProfileDetail.address?.postcode,
      country: orgProfileDetail.address?.country
    }
  });

  const avatarAlt = "@InnovateFoundation";

  const handleCompanyInfoSubmit = (data: z.infer<typeof companyInfoFormSchema>) => {
    console.log(data);
  };

  const handleAddressInfoSubmit = (data: z.infer<typeof addressInfoFormSchema>) => {
    console.log("Address Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
  };

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Company Name",
      disabled: !canEditOrganisationProfile
    },
    {
      name: "email",
      label: "Email",
      placeholder: "company@example.com",
      disabled: !canEditOrganisationProfile
    },
    {
      name: "websiteUrl",
      label: "Website Url",
      placeholder: "Website Url",
      disabled: !canEditOrganisationProfile
    }
  ];

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="h-32 bg-accent mt-4 rounded-md flex items-center pl-4">
        <div className="top-10 left-8 flex gap-3 items-end">
          <Avatar
            avatarLink={companyInfoForm.watch("logoUrl")!}
            size={24}
            avatarAlt={avatarAlt}
            avatarPlaceholder={companyInfoForm.watch("name")}
            outline={true}
          />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold capitalize">{companyInfoForm.watch("name")}</p>
            <p className="text-xs">{companyInfoForm.watch("websiteUrl")}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={"secondary"} className="lowercase p-0 px-2 rounded-full font-medium text-xs text-secondary-foregroundGreen bg-secondary-green">
                {orgProfileDetail.status}
              </Badge>
              <Badge
                variant={"outline"}
                className="lowercase p-0 px-2 rounded-full font-medium text-xs text-secondary-foreground  border-primary-light bg-secondary"
              >
                {orgProfileDetail.orgName}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormWrapper formTitle="Company Information" onSave={canEditOrganisationProfile ? companyInfoForm.handleSubmit(handleCompanyInfoSubmit) : undefined}>
          <Form {...companyInfoForm}>
            <div className="flex gap-4 w-full">
              {formFields.slice(0, 2).map(field => (
                <FormFieldItem
                  key={field.name}
                  fieldControl={companyInfoForm.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                />
              ))}
            </div>
            <FormFieldItem
              fieldControl={companyInfoForm.control}
              name={formFields[2].name}
              label={formFields[2].label}
              placeholder={formFields[2].placeholder}
              disabled={formFields[2].disabled}
            />
          </Form>
        </FormWrapper>

        <FormWrapper formTitle={"Address"} onSave={canEditOrganisationProfile ? addressInfoForm.handleSubmit(handleAddressInfoSubmit) : undefined}>
          <Form {...addressInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={addressInfoForm.control} name="country" label="Country" placeholder="AU" disabled={!canEditOrganisationProfile} />
              <FormFieldItem
                fieldControl={addressInfoForm.control}
                name="state"
                label="State"
                placeholder="New South Wales"
                disabled={!canEditOrganisationProfile}
              />
            </div>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={addressInfoForm.control} name="suburb" label="Suburb" placeholder="Sydney" disabled={!canEditOrganisationProfile} />
              <FormFieldItem
                fieldControl={addressInfoForm.control}
                name="postcode"
                label="Postcode"
                placeholder="2000"
                disabled={!canEditOrganisationProfile}
              />
            </div>
            <FormFieldItem
              fieldControl={addressInfoForm.control}
              name="street"
              label="Street"
              placeholder="123 Main Street"
              disabled={!canEditOrganisationProfile}
            />
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default OrganisationProfile;
