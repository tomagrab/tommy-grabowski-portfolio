import '@/app/PrivacyPolicy/PrivacyPolicy.scss';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="PrivacyPolicy">
      <PrivacyPolicyHeader />
      <p>
        Your privacy is important to us. It is our policy to respect your
        privacy regarding any information we may collect from you across our
        website,{` `}
        <Link
          href="http://www.tommygrabowski.com"
          className="text-celestial-blue"
        >
          Tommy Grabowski
        </Link>
        , and other sites we own and operate.
      </p>
      <p>
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we&apos;re collecting it
        and how it will be used.
      </p>
      <p>
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we&apos;ll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorised access, disclosure, copying, use or modification.
      </p>
      <p>
        We don&apos;t share any personally identifying information publicly or
        with third-parties, except when required to by law.
      </p>
      <p>
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </p>
      <p>
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </p>
      <p>
        Your continued use of our website will be regarded as acceptance of our
        practices around privacy and personal information. If you have any
        questions about how we handle user data and personal information, feel
        free to contact us.
      </p>
      <p>
        If you would like to delete your account, you can do so by visiting your
        profile, select Manage Account, and then select DELETE ACCOUNT. This
        will permanently delete your account and all of your data.
      </p>
      <p>This policy is effective as of January 1st, 2024.</p>
    </div>
  );
}

function PrivacyPolicyHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">Privacy Policy</h2>
    </div>
  );
}
