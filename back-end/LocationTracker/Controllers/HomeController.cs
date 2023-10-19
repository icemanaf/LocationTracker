﻿using LocationTracker.Models;
using LocationTrackerLib.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LocationTracker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly ILocationReportDataService _locationReportDataService;

        private readonly ITimeService _timeService;

        private readonly IGeoService _geoService;

        private readonly ISmsNotifier _smsNotifier;

        private readonly IUserDataService _userDataService;

        public HomeController(ILogger<HomeController> logger, ILocationReportDataService locationReportDataService, ITimeService timeService, IGeoService geoService, ISmsNotifier smsNotifier, IUserDataService userDataService)
        {
            _logger = logger;

            _locationReportDataService = locationReportDataService;

            _timeService = timeService;

            _geoService = geoService;

            _smsNotifier = smsNotifier;

            _userDataService = userDataService;
        }

        public async Task<IActionResult> Index()
        {
            //implement user authorization checks here

            var globalUser=await _userDataService.GetGlobalUser();

            if (globalUser == null)
            {
                //create the global user if not already there
                await _userDataService.SaveGlobalSettings(true, true);
            }


            return View();
        }

        [HttpGet]
        public async Task<IActionResult> LogOut()
        {
            await HttpContext.SignOutAsync("Cookies");

            await HttpContext.SignOutAsync("OpenIdConnect");

            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<JsonResult> GetLocationReports()
        {
            var fromDate = _timeService.GetCurrentUTCDateTime();

            var toDate = fromDate.AddHours(24);

            var reports = await _locationReportDataService.GetRecordsAsync("", fromDate, toDate);

            return Json(reports);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLocationReport(string name, string mobile)
        {
            if (string.IsNullOrEmpty(name))
            {
                return StatusCode(400, "Name cannot be empty.");
            }

            if (string.IsNullOrEmpty(mobile))
            {
                return StatusCode(400, "Mobile cannot be empty.");
            }

            return StatusCode(200);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}