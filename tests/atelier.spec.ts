import { test, expect } from "@playwright/test";
for (const viewport of [390, 1440]) {
  test(`parcours complet à ${viewport}px : inspiration, configuration, demande, statut et présentation`, async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: viewport, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const gallery = page.locator("#inspirations");
    await gallery.getByRole("button", { name: "Robes", exact: true }).click();
    await expect(gallery.locator(".look")).toHaveCount(1);
    await gallery.getByRole("button", { name: "Tout", exact: true }).click();
    await expect(gallery.locator(".look")).toHaveCount(4);
    await page
      .getByRole("button", { name: "Enregistrer La lumière, simplement." })
      .click();
    await expect(
      page.getByRole("link", { name: "1 inspirations favorites" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Agrandir : La lumière, simplement." })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    const config = page.locator("#experience");
    await config
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await expect(config.getByRole("alert")).toContainText(
      "Choisissez une date",
    );
    await config.getByRole("button", { name: "Mois suivant" }).click();
    await config
      .locator(".calendar-grid button")
      .filter({ hasText: /^15$/ })
      .click();
    await config
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await config.getByRole("button", { name: /Glamour sophistiqué/ }).click();
    await config
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await config.getByRole("button", { name: /Attache couture/ }).click();
    await config
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await config.getByRole("button", { name: /Romance en dentelle/ }).click();
    await config
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await config
      .getByLabel("Votre forfait illustratif")
      .selectOption("prestige");
    await config.getByRole("button", { name: /Soin préparatoire/ }).click();
    await expect(config.locator(".config-total")).toContainText(/1\s*540/);
    await config
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await expect(config.locator(".summary-list")).toContainText(
      "Glamour sophistiqué",
    );
    await config.screenshot({
      path: `test-results/visuels/experience-composee-${viewport}.png`,
    });
    await config.getByRole("button", { name: "Préparer ma demande" }).click();
    const booking = page.locator(".booking-dialog");
    await booking
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await booking
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await expect(booking.getByLabel(/La lumière, simplement/)).toBeChecked();
    await booking
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await booking
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await expect(booking.getByRole("alert")).toContainText("nom");
    await booking.getByLabel("Votre nom").fill("Mariée test");
    await booking.getByLabel("Téléphone tunisien").fill("123");
    await booking
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await expect(booking.getByRole("alert")).toContainText("numéro tunisien");
    await booking.getByLabel("Téléphone tunisien").fill("+216 25 123 456");
    await booking
      .getByRole("button", { name: "Continuer", exact: true })
      .click();
    await expect(booking.locator(".deposit-preview")).toContainText("462");
    await booking
      .getByRole("button", { name: "Enregistrer ma demande de démo" })
      .click();
    await expect(booking).toContainText(
      "Demande enregistrée dans cette démonstration.",
    );
    await booking
      .getByRole("button", { name: "Copier le récapitulatif" })
      .click();
    await expect(
      booking.getByRole("button", { name: "Récapitulatif copié" }),
    ).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      "Mariée test",
    );
    await booking
      .getByRole("button", { name: "Préparer un message WhatsApp" })
      .click();
    await expect(booking.locator(".message-preview textarea")).toHaveValue(
      /Glamour sophistiqué/,
    );
    await expect(
      booking.getByRole("link", { name: "Ouvrir WhatsApp" }),
    ).toHaveCount(0);
    await booking.getByRole("link", { name: /Consulter le dossier/ }).click();
    await expect(page.getByRole("row", { name: /Mariée test/ })).toBeVisible();
    await page.getByLabel("Statut de Mariée test").selectOption("Confirmée");
    await page.reload();
    await expect(page.getByLabel("Statut de Mariée test")).toHaveValue(
      "Confirmée",
    );
    await page
      .getByRole("button", { name: "Voir le dossier de Mariée test" })
      .click();
    await expect(page.getByRole("dialog")).toContainText("Soin préparatoire");
    await page
      .getByRole("button", { name: "Fermer le dossier", exact: true })
      .first()
      .click();
    await page.getByLabel("Conversion envisagée", { exact: true }).fill("50");
    await expect(page.locator(".sim-main-result strong")).toContainText("9");
    await page.getByLabel("Conversion envisagée", { exact: true }).fill("10");
    await expect(page.locator(".sim-main-result strong")).toContainText(
      /-3\s*000/,
    );
    await page.getByRole("link", { name: "Lancer la présentation" }).click();
    for (let i = 0; i < 5; i++)
      await page.getByRole("button", { name: "La suite", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "Découvrir l’espace Sihem" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Recommencer", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Le premier regard",
    );
    expect(errors).toEqual([]);
  });
}
for (const width of [360, 390, 768, 1440]) {
  test(`mise en page et images à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/admin-demo", "/presentation"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      if (route === "/") {
        await page.locator("#experience").scrollIntoViewIfNeeded();
        await expect(page.locator("#experience .config-content")).toBeVisible();
        await page
          .getByRole("button", { name: "Mon rendez-vous", exact: true })
          .click();
        const box = await page.locator(".booking-dialog").boundingBox();
        expect(box!.width).toBeLessThanOrEqual(width);
        await page.keyboard.press("Escape");
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await page.waitForTimeout(900);
      expect(
        await page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every(
              (img) =>
                (img as HTMLImageElement).complete &&
                (img as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      ).toBeTruthy();
      await page.screenshot({
        path: `test-results/visuels/${route === "/" ? "accueil" : route.slice(1)}-${width}.png`,
        fullPage: true,
      });
      if (route === "/")
        await page.screenshot({
          path: `test-results/visuels/hero-${width}.png`,
        });
    }
  });
}
test("réinitialisation des seules données locales", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Enregistrer La lumière, simplement." })
    .click();
  await page.goto("/admin-demo");
  await page.getByRole("button", { name: "Réinitialiser la démo" }).click();
  await page
    .getByRole("button", { name: "Réinitialiser", exact: true })
    .click();
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "0 inspirations favorites" }),
  ).toBeVisible();
});
