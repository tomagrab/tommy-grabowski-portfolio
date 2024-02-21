import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AboutMe() {
  return (
    <Card className="flex w-full flex-col items-center backdrop-blur-xl">
      <CardHeader className="mt-4 text-center">
        <CardTitle id="AboutMe">About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="text-lg font-bold">Hello, I&apos;m Tommy!</h4>
        <p className="leading-8">
          I&apos;m a passionate web developer with a background in Cybersecurity
          from{' '}
          <Link
            href="https://explore.ecpi.edu/programs/main/index.php?cmpid=PPCGGLBRD&SearchKeyword=ecpi%20charlotte%20nc&AdGroup=ECPI%20Charlotte&campaign=%5BS-Charlotte%5D%20Brand%20-%20Exact&c=charlotte&mkwid=sfhO461u&device=c&pkw=ecpi%20charlotte%20nc&pcrid=422043044624&pmt=e&slid=&s=google&k=ecpi%20charlotte%20nc&utm_source=google&utm_medium=cpc&utm_campaign=%5BS-Charlotte%5D+Brand+-+Exact&utm_term=ecpi%20charlotte%20nc&utm_content=422043044624&hsa_acc=5652491840&hsa_cam=975591805&hsa_grp=47863339425&hsa_ad=422043044624&hsa_src=g&hsa_tgt=aud-1273477721897:kwd-360799156709&hsa_kw=ecpi%20charlotte%20nc&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAiA29auBhBxEiwAnKcSqueqhjsWClJVOIg1fsNqwnkFTZs6ynJ9iD3CgxortuIHPNSMIYu7uRoCozYQAvD_BwE"
            target="_blank"
            className="text-ecpi-blue hover:text-ecpi-blue-light transition-colors duration-300"
          >
            <strong>ECPI University of Charlotte, NC</strong>
          </Link>
          .
        </p>
        <p className="leading-8">
          My journey into development has been driven by self-learning and a
          deep interest in creating engaging web experiences.
        </p>
        <p className="leading-8">
          I specialize in crafting modern web applications using React, Next.js,
          TailwindCSS, and SCSS.
        </p>
      </CardContent>
    </Card>
  );
}
