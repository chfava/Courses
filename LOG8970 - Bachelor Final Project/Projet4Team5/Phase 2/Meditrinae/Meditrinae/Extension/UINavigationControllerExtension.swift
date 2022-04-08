//
//  UINavigationControllerExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-09.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UINavigationController {
    
    func initRootViewController(vc: UIViewController) {
        self.viewControllers.removeAll()
        self.pushViewController(vc, animated: false)
        self.popToRootViewController(animated: false)
    }
}
