import { test, expect, request } from '@playwright/test';

test.describe('Test for Qubika E2E and UI', () => {
	test('Should create an user from API request', async ({  }) => {

    // Step 1: API Registration
    const apiCall = await request.newContext();

	const userCreation = await apiCall.post(`https://api.club-administration.qa.qubika.com/api/auth/register`, {
		data: {
			email: "arthur.morgan@test123.com",
        	password: "PasswordMorgan123!",
        	roles: ["ROLE_ADMIN"]
      	},
      	headers: {
		'Content-Type': 'application/json',
		}
	});
});

	test('should validate login page correct display', async ({ page }) => {

	// Validate Login UI structure
	await page.goto('https://club-administration.qa.qubika.com/#/auth/login');
	await expect(page).toHaveTitle(/Qubika Club/);
	await expect(page.locator('text=Por favor ingrese correo y contraseña')).toBeVisible();
	await expect(page.locator('input[placeholder="Usuario o correo electrónico"]')).toBeVisible();
	await expect(page.locator('input[placeholder="Contraseña"]')).toBeVisible();
	await expect(page.locator('input[type=checkbox]')).toBeVisible();
	await page.click('text=Recordarme');
	await expect(page.locator('input[type=checkbox]')).toBeChecked();
	await expect(page.locator('text=Recordarme')).toBeVisible();
	await expect(page.locator('button:has-text("Autenticar")')).toBeVisible();
});

test('should validate correct user log in and actions', async ({ page }) => {

	// Validate user login
	await page.goto('https://club-administration.qa.qubika.com/#/auth/login');
	await page.fill('input[placeholder="Usuario o correo electrónico"]', 'arthur.morgan@test123.com');
	await page.fill('input[placeholder="Contraseña"]', 'PasswordMorgan123!');
	await page.click('button:has-text("Autenticar")');
	await page.waitForSelector('text= Dashboard');
	await expect(page.locator('text= Dashboard')).toBeVisible;

	// Validate moving to category page
	await page.click('text= Tipos de Categorias');
	await page.waitForSelector('text=Categoria Padre');

	// Validate category creation
	await page.click('button:has-text(" Adicionar")');
	await page.waitForSelector('text=Adicionar tipo de categoría');
	await page.fill('input[placeholder="Nombre de categoría"]', 'CategoryMorgan');
	await page.click('button:has-text("Aceptar")');
	await page.waitForSelector('text="97"');
	await page.locator('.page-link').nth(97).click();
	await expect(page.locator('text=CategoryMorgan').first()).toBeVisible();

	// Validate subcategory creation and UI visibility
	await page.click('button:has-text(" Adicionar")');
	await page.waitForSelector('text=Adicionar tipo de categoría');
	await page.fill('input[placeholder="Nombre de categoría"]', 'SubCategoryMorgan');
	await page.click('text=Es subcategoria?');
	await expect(page.locator('input[placeholder="Seleccione la categoría padre"]')).toBeVisible;
	await page.locator('.ng-input').click();
	await page.locator('.ng-select input').type('Star');
	await expect(page.locator('.ng-input=')).toBeVisible;
	await page.keyboard.press('Enter');
	await expect(page.locator('text=Star')).toBeVisible;
	await page.click('button:has-text("Aceptar")');
	await expect(page.locator('text=SubCategoryMorgan')).toBeVisible;
	});
});
