import fs from "fs";
import path from "path";

import { Occupation } from "@/types/Occupation";

export class OccupationsExtractor {
  fetchAll(): Array<Occupation> {
    const occupations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public/files/occupations.json"),
        "utf-8"
      )
    );

    return Object.keys(occupations).map((slug) => {
      const occupation = occupations[slug];

      return {
        ...occupation,
        slug,
      };
    });
  }

  fetchOne({ slug }: { slug: string }): Occupation | undefined {
    const occupations = this.fetchAll();
    return occupations.find((occupation) => occupation.slug === slug);
  }
}
